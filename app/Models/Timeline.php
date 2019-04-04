<?php

namespace App\Models;

use App\Traits\ActivityTrail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{


    protected static $logName = 'timeline';

    protected $fillable = [
        'begin_time',
        'end_time',
        'order'
    ];

    public function reservation()
    {
        return $this->hasMany(Reservation::class);
    }

    public function rest()
    {
        return $this->hasMany(ExpertRest::class, 'timeline_id');
    }

    public function ExpertRest()
    {
        return $this->belongsToMany(Expert::class, 'expert_rests', 'timeline_id', 'expert_id');
    }

    public function parseTime()
    {
        $beginTime = Carbon::parse($this->begin_time)->format('H:m');
        $endTime   = Carbon::parse($this->end_time)->format('H:m');
        return "{$beginTime}-{$endTime}";
    }
}
