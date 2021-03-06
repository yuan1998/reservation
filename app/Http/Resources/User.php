<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                 => $this->id,
            'name'               => $this->name,
            'avatar'             => $this->avatar,
            'avatar'             => $this->avatar,
            'weixin_openid'      => $this->weixin_openid,
            'weixin_unionid'     => $this->weixin_unionid,
            'weixin_session_key' => $this->weixin_session_key,
            'weapp_openid'       => $this->weapp_openid ?: '',
            'status'             => $this->status,
            'role'               => $this->roles,
            'permission'         => $this->permission ?: [],
            'permissions'        => $this->permissions,
            'username'           => $this->username,
            'email'              => $this->email,
            'created_at'         => $this->created_at->toDateTimeString(),
            'updated_at'         => $this->updated_at->toDateTimeString(),
        ];
    }

    public function additional(array $data)
    {
        return [
            'code' => 1,
        ];
//        return parent::additional($data); // TODO: Change the autogenerated stub
    }

}
