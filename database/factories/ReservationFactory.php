<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Reservation::class, function (Faker $faker) {
    static $sex = ['男', '女'];

    return [
        'name'            => $faker->word,
        'phone'            => $faker->phoneNumber,
        'description'     => $faker->sentence,
        'remark'          => $faker->sentence,
        'date'            => $faker->dateTimeBetween('-3 days', '3 days'),
        'age'             => $faker->numberBetween(11, 99),
        'sex'             => $faker->randomElement($sex),
        'created_user_id' => 1,
        'updated_user_id' => 1,
    ];
});
