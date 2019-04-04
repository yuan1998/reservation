<?php

namespace App\Models;

use App\Traits\ActivityTrail;
use Illuminate\Database\Eloquent\Model;

class ExpertProject extends Model
{


    protected static $logName = 'expertProject';

    protected $fillable = [
        'expert_id',
        'project_id'
    ];

    protected $table = 'expert_project';

    public function expert()
    {
        return $this->belongsTo(Expert::class, 'expert_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

}
