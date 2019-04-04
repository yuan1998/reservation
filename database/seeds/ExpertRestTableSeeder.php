<?php

use Illuminate\Database\Seeder;

class ExpertRestTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker      = Faker\Factory::create('zh_CN');
        $expertId   = \App\Models\Expert::all()->pluck('id');
        $timelineId = \App\Models\Timeline::all()->pluck('id');

        factory(\App\Models\ExpertRest::class, 20)->make()->each(function ($item) use ($expertId, $timelineId, $faker) {
            $item->fill([
                'expert_id'   => $faker->randomElement($expertId),
                'timeline_id' => $faker->randomElement($timelineId),
            ]);
            \App\Models\ExpertRest::create($item->toArray());
        });
    }
}
