<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Expert::class, function (Faker $faker) {
    return [
        'name'        => $faker->word . '医生',
        'avatar'      => $faker->imageUrl(),
        'description' => $faker->sentence
    ];
});
