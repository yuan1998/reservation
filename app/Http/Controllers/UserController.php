<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Users as UserColletion;

class UserController extends Controller
{
    public $log_name = '用户';

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(Request $request)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        $data = User::with(['roles', 'permissions'])
            ->orderBy('id', 'desc')
            ->paginate($request->get('pageindex', 15));

        return UserResource::collection($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UserStoreRequest $request
     * @return UserResource
     */
    public function store(UserStoreRequest $request)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        $data             = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user             = User::create($data);

        $this->storeLog($user, ":causer.name 创建新的用户 :subject.name");

        $this->syncModelPermission($user);
        $this->syncModelRole($user);

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return UserResource
     */
    public function show(User $user)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\User                $user
     * @return UserResource
     */
    public function update(Request $request, User $user)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        $this->syncModelPermission($user);
        $this->syncModelRole($user);
        $data = $request->all();

        if ($request->exists('password')) {
            if ($data['password']) {
                $data['password'] = bcrypt($data['password']);
            } else {
                unset($data['password']);
            }
        }
        if (!@$data['avatar']) {
            unset($data['avatar']);
        }

        $origin = $user->toArray();
        $user->update($data);
        $this->updateLog($user, $origin, ":causer.name 修改了用户 :subject.name");

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  String $ids
     * @return \Illuminate\Http\Response
     */
    public function destroy($ids)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        return $this->destroyIds($ids, User::query(), ":causer.name 删除了用户 :subject.name");
    }
}
