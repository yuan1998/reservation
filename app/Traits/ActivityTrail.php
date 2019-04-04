<?php

namespace App\Traits;

use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\CausesActivity;
use Spatie\Activitylog\Traits\LogsActivity;

trait ActivityTrail
{
//    use LogsActivity;
    use CausesActivity;

//    protected static $logAttributes = ['*'];
//    protected static $logOnlyDirty = true;
//
//    public function tapActivity(Activity $activity, string $eventName)
//    {
//        $activity->ip     = request()->ip();
//        $activity->method = request()->method();
//    }
//
//    public function getDescriptionForEvent(string $eventName): string
//    {
//        $modelName = self::$modelName ?:class_basename($this);
//
//        switch ($eventName) {
//            case "deleted":
//                return "删除了一个 {$modelName}";
//                break;
//            case "updated" :
//                return "修改了一个 {$modelName}";
//                break;
//            case "created" :
//                return "创建了一个 {$modelName}";
//                break;
//        }
//    }


}
