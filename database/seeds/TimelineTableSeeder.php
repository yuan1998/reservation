<?php

use Illuminate\Database\Seeder;

class TimelineTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timelines = [
            [
                '2019-03-08 08:00:00',
                '2019-03-08 09:00:00',
            ],
            [
                '2019-03-08 09:00:00',
                '2019-03-08 10:00:00',
            ],
            [
                '2019-03-08 11:00:00',
                '2019-03-08 12:00:00',
            ],
            [
                '2019-03-08 12:00:00',
                '2019-03-08 13:00:00',
            ],
            [
                '2019-03-08 13:00:00',
                '2019-03-08 14:00:00',
            ],
            [
                '2019-03-08 14:00:00',
                '2019-03-08 15:00:00',
            ],
            [
                '2019-03-08 15:00:00',
                '2019-03-08 16:00:00',
            ],
            [
                '2019-03-08 15:00:00',
                '2019-03-08 16:00:00',
            ],
            [
                '2019-03-08 16:00:00',
                '2019-03-08 17:00:00',
            ],
            [
                '2019-03-08 17:00:00',
                '2019-03-08 18:00:00',
            ],
        ];
        factory(\App\Models\Timeline::class, 10)->make()->each(function ($item, $index) use ($timelines) {
            $a                = $timelines[$index];
            $item->begin_time = $a[0];
            $item->end_time   = $a[1];

            \App\Models\Timeline::create($item->toArray());
        });
    }
}
