<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Spatie\Activitylog\Models\Activity;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function guard()
    {
        return Auth::guard('api');
    }

    public function getUser()
    {
        return $this->guard()->user();
    }

    public function createByMe($model , $field  = 'created_user_id')
    {
        $user = $this->getUser();
        return $user->id === $model[$field];
    }

    public function hasPermission($permission, $admin = true)
    {
        $user = $this->getUser();

        if ($user) {
            $permission = collect($permission);

            if ($admin) {
                $permission->push('all');
            }

            return $user->hasAnyPermission($permission->toArray());
        }

        return false;
    }

    protected function responseSuccess($data = null, $code = 200)
    {
        $data = !$data ? null : [
            'code' => 1,
            'data' => $data,
        ];
        return response($data, $code);
    }

    protected function responseError($msg = 'error', $code = 400)
    {
        $data = [
            'code'    => 0,
            'message' => $msg
        ];
        return response($data, $code);
    }

    protected function withToken($token)
    {
        return [
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => $this->guard()->factory()->getTTL() * 60
        ];
    }

    protected function respondWithToken($token)
    {
        return $this->responseSuccess($this->withToken($token));
    }

    protected function respondPermission()
    {
        return response([
            'code'    => 4,
            'message' => 'permission defined'
        ], 403);
    }

    protected function destroyIds($ids, $query, $logText = ':causer.name 删除了 :subject.name')
    {

        $arr  = explode(',', $ids);
        $query->whereIn('id', $arr)->get()
            ->each(function ($each) use ($logText) {
            $each->delete();
            $this->destroyLog($each , $logText);
        });


        return response()->json(null, 204);
    }

    protected function modelFillSave($model, $data)
    {
        $model->fill($data);
        $model->save();


        return $this->responseSuccess($model);
    }

    protected function syncModelPermission($model)
    {
        $permission = request()->get('permissions', false);

        if (is_array($permission)) {
            $permission      = arrInPermission(Permission::query(), $permission);
            $permissionNames = $permission->pluck('name');

            $modelBeforePermission = $model->permissions->pluck('name');
            $model->syncPermissions($permissionNames);
            $property = [
                'attribute' => $permissionNames,
                'old'       => $modelBeforePermission,
            ];
            $this->logActivity('修改了 :subject.name 的权限', $this->getUser(), $model, $property);
        }
    }

    protected function syncModelRole($model)
    {
        $role = request()->get('role', false);
        if (is_array($role)) {
            $role  = arrInPermission(Role::query(), $role);
            $roles = $role->pluck('name');

            $modelBeforeRole = $model->getRoleNames()->all();
            $model->syncRoles($roles);
            $property = [
                'attribute' => $roles,
                'old'       => $modelBeforeRole,
            ];

            $this->logActivity('更新了 :subject.name 的角色', $this->getUser(), $model, $property);
        }
    }

    protected function logActivity($log = 'do it',
                                   $causer = null,
                                   $model = null,
                                   $properties = null,
                                   $logName = null)
    {
        $activity = activity();

        if ($causer) {
            $activity->causedBy($causer);
        }

        if ($model) {
            $activity->performedOn($model);
        }

        if ($properties) {
            $activity->withProperties($properties);
        }

        $activity->tap(function (Activity $activity) {
            $activity->ip     = request()->ip();
            $activity->method = request()->method();
        });

        if ($logName = $logName ?: $this->log_name) {
            $activity->inLog($logName);
        }

        $activity->log($log);
    }

    public function storeLog($model = null, $log = '', $causer = null)
    {
        if (!$model) {
            return;
        }

        $causer     = $causer ?: $this->getUser();
        $properties = [
            'request'   => request()->all(),
            'attribute' => $model
        ];
        $this->logActivity($log, $causer, $model, $properties);
    }

    public function updateLog($model = null, $origin = null, $log = '', $causer = null)
    {
        if (!$model) {
            return;
        }

        $causer   = $causer ?: $this->getUser();
        $property = [
            'request'   => request()->all(),
            'attribute' => $model,
            'changes'   => $model->getChanges(),
            'old'       => $origin
        ];
        $this->logActivity($log, $causer, $model, $property);
    }

    public function destroyLog($model = null, $log = '', $causer = null)
    {
        if (!$model) {
            return;
        }

        $causer     = $causer ?: $this->getUser();
        $properties = [
            'old' => $model
        ];
        $this->logActivity($log, $causer, $model, $properties);
    }

}
