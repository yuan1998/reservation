<?php

namespace App\Models;

use App\Traits\ActivityTrail;
use Illuminate\Database\Eloquent\Model;


class Expert extends Model
{


    protected static $logName = 'expert';


    protected $fillable = [
        'name',
        'data',
        'remark',
        'description',
    ];

    protected $casts = [
        'data' => 'json'
    ];

    public function project()
    {
        return $this->belongsToMany(Project::class, 'expert_project', 'expert_id', 'project_id');
    }

    public function expertProject()
    {
        return $this->hasMany(ExpertProject::class);
    }

    public function reservation()
    {
        return $this->hasMany(Reservation::class);
    }

    public function rest()
    {
        return $this->hasMany(ExpertRest::class);
    }

    public function addProject($id)
    {
        return ExpertProject::create([
            'expert_id'  => $this->id,
            'project_id' => $id,
        ]);
    }
}
