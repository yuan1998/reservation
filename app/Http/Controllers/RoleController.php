<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Role as RoleResource;

class RoleController extends Controller
{

    public $log_name = "角色";

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index()
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        $role = Role::with('permissions')->where('guard_name', request()->get('guard_name', 'api'))->get();
        return RoleResource::collection($role);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  RoleStoreRequest $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(RoleStoreRequest $request)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        $data               = $request->only(['name', 'text']);
        $data['guard_name'] = request()->get('guard_name', 'api');
        $role               = Role::create($data);
        $this->storeLog($role, ":causer.name 创建了新角色 :subject.name");

        $permissions = request()->get('permissions');
        $d           = arrInPermission(Permission::query(), $permissions);

        $role->syncPermissions($d->pluck('name'));

        return new RoleResource($role);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show($id)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        return new RoleResource(Role::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  RoleUpdateRequest $request
     * @param  Role              $role
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(RoleUpdateRequest $request, Role $role)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        if ($name = $request->get('name', null)) {
            $nameItem = Role::where('name', $name)->where('id', '<>', $role->id)->first();

            if ($nameItem && $nameItem->name === $role->name) {
                return $this->responseError('name 已经存在');
            }
        }

        $origin = $role->toArray();
        $role->update($request->only(['text', 'name']));
        $this->updateLog($role, $origin, ":causer.name 修改了角色 :subject.name");
        $this->syncModelPermission($role);

        return new RoleResource($role);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @param  Role $role
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function destroy(Role $role)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        $role->delete();
        $this->destroyLog($role, ":causer.name 删除了角色 :subject.name");
        return response(null, 204);
    }
}
