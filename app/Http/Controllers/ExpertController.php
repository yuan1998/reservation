<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpertStoreRequest;
use App\Models\Expert;
use App\Models\ExpertProject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Expert as ExpertResource;
use App\Http\Resources\ExpertDefault as ExpertDefaultResource;

class ExpertController extends Controller
{

    public $log_name = '医生';


    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(Request $request)
    {
        if (!$this->hasPermission(['expert:index', 'reservation:table'])) {
            return $this->respondPermission();
        }

        $expert = Expert::with([
            'project' => function ($query) {
                $query->where('display', '<>', false);
            }
        ])->orderBy('id', 'desc')->paginate($request->get('pageindex', 15));


        return ExpertResource::collection($expert);
    }

    public function indexAll(Request $request)
    {
        if (!$this->hasPermission(['expert:index', 'reservation:table'])) {
            return $this->respondPermission();
        }

        $expert = Expert::with('project')->orderBy('id', 'desc')->get();

        return ExpertDefaultResource::collection($expert);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ExpertStoreRequest $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(ExpertStoreRequest $request)
    {
        if (!$this->hasPermission('expert:store')) {
            return $this->respondPermission();
        }

        $data = $request->all();

        $expert = Expert::create($data);

        $this->storeLog($expert, ':causer.name 创建了一名医生 :subject.name ');

        if ($project = request()->get('project', [])) {
            $expert->project()->sync($project);
        }
        return new ExpertResource($expert);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expert $expert
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(Expert $expert)
    {
        if (!$this->hasPermission('expert:show')) {
            return $this->respondPermission();
        }

        return new ExpertResource($expert);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Expert       $expert
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(Request $request, Expert $expert)
    {
        if (!$this->hasPermission('expert:update')) {
            return $this->respondPermission();
        }


        if ($project = $request->get('project', false)) {
            $expert->project()->sync($project);
        }

        $origin = $expert->toArray();
        $expert->update($request->all());
        $this->updateLog($expert, $origin, ":causer.name 修改了 :subject.name 的医生信息.");

        return new ExpertResource($expert);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @param  Expert $expert
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function destroy(Expert $expert)
    {
        if (!$this->hasPermission('expert:destroy')) {
            return $this->respondPermission();
        }

        $expert->delete();

        $this->destroyLog($expert, ":causer.name 删除了 :subject.name 医生");
        return response()->json(null, 204);
    }
}
