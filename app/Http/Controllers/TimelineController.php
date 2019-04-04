<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimelineRequest;
use App\Models\Timeline;
use Illuminate\Http\Request;
use App\Http\Resources\Timeline as TimelineResource;

class TimelineController extends Controller
{
    public $log_name = '时间段';

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index()
    {
        if (!$this->hasPermission(['timeline:index', 'reservation:table'])) {
            return $this->respondPermission();
        }
        return TimelineResource::collection(Timeline::orderBy('order')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TimelineRequest $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(TimelineRequest $request)
    {
        if (!$this->hasPermission('timeline:store')) {
            return $this->respondPermission();
        }
        $data          = $request->all();
        $data['order'] = (Timeline::count() + 1);

        $timeline = Timeline::create($data);
        $date     = $timeline->parseTime();
        $this->storeLog($timeline, ":causer.name 创建新的时间段 {$date}");

        return new TimelineResource($timeline);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Timeline $timeline
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(Timeline $timeline)
    {
        if (!$this->hasPermission('timeline:show')) {
            return $this->respondPermission();
        }
        return new TimelineResource($timeline);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Timeline     $timeline
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(Request $request, Timeline $timeline)
    {
        if (!$this->hasPermission('timeline:update')) {
            return $this->respondPermission();
        }

        $date   = $timeline->parseTime();
        $origin = $timeline->toArray();
        $timeline->update($request->all());

        $this->updateLog($timeline, $origin, ":causer.name 修改了时间段 {$date}");


        return new TimelineResource($timeline);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @param  Timeline $timeline
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function destroy(Timeline $timeline)
    {
        if (!$this->hasPermission('timeline:destroy')) {
            return $this->respondPermission();
        }

        $timeline->delete();
        $this->destroyLog($timeline, ":causer.name 删除了时间段 {$timeline->parseTime()}");

        return response(null, 204);
    }


    public function updateOrder(Request $request)
    {
        $data = $request->get('data', null);

        if (!$data) {
            return $this->responseError('Request Error . Missing Parameter "data"');
        }

        collect($data)->each(function ($id, $index) {
            Timeline::where('id', $id)->update(['order' => $index + 1]);
        });

        return $this->responseSuccess(null);
    }
}
