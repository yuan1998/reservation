<?php

use Faker\Generator as Faker;

$factory->define(App\Models\ExpertRest::class, function (Faker $faker) {
    return [
        'date' => $faker->dateTimeBetween('-3 days', '3 days'),
    ];
});
