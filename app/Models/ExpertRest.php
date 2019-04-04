<?php

namespace App\Models;

use App\Traits\ActivityTrail;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

class ExpertRest extends Model
{


    protected static $logName = 'rest';

    protected $fillable = [
        'expert_id',
        'timeline_id',
        'date',
        'rest_day'
    ];

    protected $casts = [
        'rest_day' => 'boolean',
    ];

    public function expert()
    {
        return $this->belongsTo(Expert::class);
    }

    public function timeline()
    {
        return $this->belongsTo(Timeline::class);
    }

    public function reservation()
    {
        return $this->hasMany(Reservation::class);
    }


}
