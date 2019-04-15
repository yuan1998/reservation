<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Models\Expert;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\Reservation as ReservationResource;

class ReservationController extends Controller
{
    public $log_name = '预约';

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(Request $request)
    {
        if (!$this->hasPermission(['reservation:index', 'reservation:table'])) {
            return $this->respondPermission();
        }
        $date = $request->get('date', null);
        $date = $date ? Carbon::parse($date)->toDateTimeString() : Carbon::today();

        $data = Reservation::with(['createdBy', 'updatedBy'])->whereDate('date', $date)->get();
        return ReservationResource::collection($data);
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function indexTable(Request $request)
    {

        if (!$this->hasPermission('reservation:index')) {
            return $this->respondPermission();
        }
        $date      = $request->get('date');
        $projectId = $request->get('project_id');
        $expert    = Expert::with([
            'rest'           => function ($query) use ($date) {
                $query->whereDate('date', $date);
            }, 'reservation' => function ($query) use ($date) {
                $query->whereDate('date', $date);
            }
        ])->whereHas('expertProject', function ($query) use ($projectId) {
            $query->where('project_id', $projectId);
        })->get();

        return \App\Http\Resources\ReservationExpert::collection($expert);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ReservationRequest $request
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function store(ReservationRequest $request)
    {
        if (!$this->hasPermission('reservation:store')) {
            return $this->respondPermission();
        }


        $data         = $request->all();
        $data['date'] = Carbon::parse($data['date'])->toDateTimeString();

        $user                    = $this->getUser();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;
        if (!@$data['description']) {
            $data['description'] = '';
        }
        if (!@$data['remark']) {
            $data['remark'] = '';
        }

        $reservation = Reservation::create($data);
        $this->storeLog($reservation, ":causer.name 创建了 :subject.name 的预约");

        return new ReservationResource($reservation);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation $reservation
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function show(Reservation $reservation)
    {
        if (!$this->hasPermission(['reservation:index','reservation:table'])) {
            return $this->respondPermission();
        }
        return new ReservationResource($reservation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function update(Request $request, Reservation $reservation)
    {
        if (!$this->hasPermission('reservation:update') && !$this->createByMe($reservation)) {
            return $this->respondPermission();
        }
        $data = $request->all();

        $user                    = $this->getUser();
        $data['date'] = Carbon::parse($data['date'])->toDateTimeString();
        $data['updated_user_id'] = $user->id;

        if (!@$data['description']) {
            $data['description'] = '';
        }
        if (!@$data['remark']) {
            $data['remark'] = '';
        }

        $origin = $reservation->toArray();
        $reservation->update($data);
        $this->updateLog($reservation, $origin, ":causer.name 修改了 :subject.name 的预约");

        return new ReservationResource($reservation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @throws \Exception
     * @param  Reservation $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        if (!$this->hasPermission('reservation:destroy') && !$this->createByMe($reservation)) {
            return $this->respondPermission();
        }

        $reservation->delete();
        $this->destroyLog($reservation, ':causer.name 删除了 :subject.name 的预约');

        return response(null, 204);
    }

    public function multipleDestroy($ids)
    {

        if (!$this->hasPermission('reservation:destroy')) {
            return $this->respondPermission();
        }

        return $this->destroyIds($ids, Reservation::query(), ':causer.name 删除了 :subject.name 的预约');
    }

    public function count(Request $request)
    {
        $query = Reservation::query();
        $date  = $request->get('date', 'today');

        $this->countWithDate($query, $date);

        return response([
            'count' => $query->count()
        ], 200);
    }

    protected function countWithDate($query, $date)
    {
        switch ($date) {
            case 'today':
                $query->whereDate('date', Carbon::today());
                break;
            case 'all':
                break;
            default :
                try {
                    $date = Carbon::parse($date);
                    $query->whereDate('date', $date->toDateTimeString());
                } catch (\Exception $e) {
                    $query->whereDate('date', Carbon::today());
                }
                break;
        }
    }
}
