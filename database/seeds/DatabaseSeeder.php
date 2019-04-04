<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserTableSeeder::class,
            ProjectTableSeeder::class,
            TimelineTableSeeder::class,
            ExpertTableSeeder::class,
            ExpertRestTableSeeder::class,
            ReservationTableSeeder::class,
            PermissionTableSeeder::class,
        ]);
    }
}
