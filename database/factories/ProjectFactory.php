<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Project::class, function (Faker $faker) {
    static $order = 1;
    return [
        'name'            => $faker->word . '手术',
        'display'         => true,
        'order'           => $order++,
        'created_user_id' => 1,
        'updated_user_id' => 1,
    ];
});
