<?php

namespace App\Models;

use App\Traits\ActivityTrail;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{


    protected static $logName = 'project';

    protected $fillable = [
        'name',
        'display',
        'order',
        'created_user_id',
        'updated_user_id'
    ];

    protected $casts = [
        'display' => 'boolean'
    ];

    public function createdBy()
    {
        return $this->hasOne(User::class, 'id', 'created_user_id');
    }

    public function updatedBy()
    {
        return $this->hasOne(User::class, 'id', 'updated_user_id');
    }

    public function reservation()
    {
        return $this->hasMany(Reservation::class, 'project_id', 'id');
    }


    public function addExpert($id)
    {
        return ExpertProject::create([
            'expert_id'  => $id,
            'project_id' => $this->id,
        ]);
    }
}
