<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Timeline::class, function (Faker $faker) {
    static $index = 1;
    return [
        'begin_time' => $faker->dateTimeBetween('2019-03-08'),
        'end_time'   => $faker->dateTimeBetween('2019-03-08'),
        'order'      => $index++,
    ];
});
