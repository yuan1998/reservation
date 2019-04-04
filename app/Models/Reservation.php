<?php

namespace App\Models;

use App\Traits\ActivityTrail;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

class Reservation extends Model
{


    protected static $logName = 'reservation';

    protected static $modelName = '预约';

    protected $fillable = [
        'name',
        'date',
        'phone',
        'age',
        'sex',
        'timeline_id',
        'project_id',
        'expert_id',
        'created_user_id',
        'updated_user_id',
        'description',
        'remark',
    ];

    protected $casts = [
        'description' => 'string',
        'remark'      => 'string',
        'phone'       => 'string',
        'age'         => 'int',
    ];

    public function createdBy()
    {
        return $this->hasOne(User::class, 'id', 'created_user_id');
    }

    public function updatedBy()
    {
        return $this->hasOne(User::class, 'id', 'updated_user_id');
    }

    public function project()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function timeline()
    {
        return $this->belongsTo(Timeline::class);
    }

    public function expert()
    {
        return $this->belongsTo(Expert::class);
    }
}
