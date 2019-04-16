<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\WeappAuthorizationRequest;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Auth;
use EasyWeChat\Factory;

class AuthController extends Controller
{

    // https://api.weixin.qq.com/sns/jscode2session?appid=wx40ca2bd02fe5ae03&secret=6332e0fcf3ad6ab0caca90d2d23b67e4&js_code=021D0bDV10xqhZ0t08CV1gIVCV1D0bDu&grant_type=authorization_code
    public function weappStore(WeappAuthorizationRequest $request)
    {
        $code = $request->code;

        $miniProgram = \EasyWeChat::miniProgram();
        $data        = $miniProgram->auth->session($code);

        // 如果结果错误，说明 code 已过期或不正确，返回 401 错误
        if (isset($data['errcode'])) {
            return $this->responseError('code 不正确', 401);
        }

        // 找到 openid 对应的用户
        $user = User::where('weapp_openid', $data['openid'])->first();

        $attributes['weixin_session_key'] = $data['session_key'];

        // 未找到对应用户则需要提交用户名密码进行用户绑定
        if (!$user) {
            if (!$name = $request->get('nickName', false)) {
                return $this->responseError('传参错误', 401);
            }

            $userValue = [
                'username'     => $name,
                'name'         => $name,
                'nickName'     => $name,
                'avatar'       => $request->avatarUrl,
                'password'     => '',
                'weapp_openid' => $data['openid'],
            ];

            $user = User::create($userValue);
            $user->syncRoles('experience');
        }

        // 更新用户数据
        $user->update($attributes);

        // 为对应用户创建 JWT
        $token = $this->guard()->fromUser($user);

        return $this->respondWithToken($token);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('username', 'password');

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return $this->responseError('用户名 或 密码 错误', 401);
    }

    public function me()
    {
        $user = $this->getUser();

        $user->permission = $user->getAllPermissions();
        return new UserResource($user);
    }

    public function logout()
    {
        $this->guard()->logout();

        return $this->responseSuccess(['message' => 'successfully logged out'], 204);
    }

    public function sign(Request $request)
    {

    }

    public function refresh()
    {
        $guard = $this->guard();
        if (!$guard->user()) {
            return $this->responseError('TOKEN 失效');
        }

        return $this->respondWithToken($guard->refresh());
    }


}
