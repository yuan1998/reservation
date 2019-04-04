<?php

namespace App\Http\Controllers;

use App\Http\Requests\RestRequest;
use App\Models\ExpertRest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Rest as RestResource;

class ExpertRestController extends Controller
{

    public $log_name = '医生休息';

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(Request $request)
    {
        if (!$this->hasPermission(['rest:index', 'reservation:table'])) {
            return $this->respondPermission();
        }
        $date = $request->get('date', null);
        $date = $date ? Carbon::parse($date)->toDateTimeString() : Carbon::today();

        $data = ExpertRest::whereDate('date', $date)->get();
        return RestResource::collection($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param array $data
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function create($data)
    {
        $data = ExpertRest::create($data);

        return $this->responseSuccess($data, Response::HTTP_CREATED);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  RestRequest $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(RestRequest $request)
    {
        if (!$this->hasPermission('rest:store')) {
            return $this->respondPermission();
        }

        $data         = $request->all();
        $date         = Carbon::parse($data['date']);
        $data['date'] = $date->toDateTimeString();
        $rest         = ExpertRest::create($data);

        $timeline = $rest->timeline;
        $expert   = $rest->expert;
        $time     = $timeline->parseTime();
        $this->storeLog($rest, ":causer.name 排班{$expert->name} {$date->format('m月d日')} {$time} 休息 ");

        return new RestResource($rest);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ExpertRest $expertRest
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(ExpertRest $expertRest)
    {
        if (!$this->hasPermission('rest:show')) {
            return $this->respondPermission();
        }
        return new RestResource($expertRest);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ExpertRest $expertRest
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function edit(ExpertRest $expertRest)
    {
        if (!$this->hasPermission('rest:update')) {
            return $this->respondPermission();
        }
        return new RestResource($expertRest);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\ExpertRest   $expertRest
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(Request $request, ExpertRest $expertRest)
    {
        if (!$this->hasPermission('rest:update')) {
            return $this->respondPermission();
        }

        $origin = $expertRest->toArray();
        $date = Carbon::parse($expertRest->date);
        $expertRest->update($request->all());
        $expert = $expertRest->expert;
        $timeLine = $expertRest->timeLine;
        $time = $timeLine->parseTime();


        $this->updateLog($expertRest , $origin ,":causer.name 修改了{$expert->name} {$date->format('m月d日')} {$time}  的排班 " );


        return new RestResource($expertRest);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @param  ExpertRest $expertRest
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpertRest $expertRest)
    {
        if (!$this->hasPermission('rest:store')) {
            return $this->respondPermission();
        }

        $timeline = $expertRest->timeline;
        $expert   = $expertRest->expert;

        $date = Carbon::parse($expertRest->date);
        $time     = $timeline->parseTime();

        $expertRest->delete();

        $this->destroyLog($expertRest, ":causer.name 取消了{$expert->name} 在 {$date->format('m月d日')} {$time} 的休息 ");

        return response(null, 204);
    }
}
