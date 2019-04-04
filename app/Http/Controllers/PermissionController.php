<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionStoreRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        $data = Permission::where('guard_name', request()->get('guard_name', 'api'))->get();
        return $this->responseSuccess($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  array $data
     * @return \Illuminate\Http\Response
     */
    public function create($data)
    {

        $data['guard_name'] = request()->get('guard_name', 'api');
        $data               = Permission::create($data);
        return $this->responseSuccess($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PermissionStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionStoreRequest $request)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        return $this->create($request->only(['name', 'text']));
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        return $this->responseSuccess(Permission::find($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        return $this->responseSuccess(Permission::find($id));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }
        $permission = Permission::find($id);

        if (!$permission) {
            return $this->responseError('Id 错误');
        }

        if (!$request->get('text' , false)) {
            return $this->responseError('text 不能为空');
        }

        return $this->modelFillSave($permission, $request->only(['text']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string $ids
     * @return \Illuminate\Http\Response
     */
    public function destroy($ids)
    {
        if (!$this->hasPermission('permission:manager')) {
            return $this->respondPermission();
        }

        return $this->destroyIds($ids, Permission::query());
    }
}
