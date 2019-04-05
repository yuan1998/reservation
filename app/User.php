<?php

namespace App;

use App\Models\Project;
use App\Models\Reservation;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use HasRoles;
    use CausesActivity;

    protected static $logName = 'user';

    protected $guard_name = 'api';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'status',
        'nickName',
        'avatar',
        'weixin_openid',
        'weixin_unionid',
        'weixin_session_key',
        'weapp_openid',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * fix Laravel-Permission `call undefined method getPermissionNames ` bug.
     */
    public function getPermissionNames()
    {
        return $this->permissions->pluck('name');
    }

    public function createdProject()
    {
        return $this->hasMany(Project::class, 'created_user_id', 'id');
    }

    public function updatedProject()
    {
        return $this->hasMany(Project::class, 'created_user_id', 'id');
    }

    public function createdReservation()
    {
        return $this->hasMany(Reservation::class, 'created_user_id', 'id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function updatedReservation()
    {
        return $this->hasMany(Reservation::class, 'updated_user_id', 'id');
    }

    public function role()
    {
        return $this->morphToMany(Role::class, 'model', 'model_has_roles');
    }

    public function permissions()
    {
        return $this->morphToMany(Permission::class, 'model', 'model_has_permissions');
    }


}
