<?php

use Illuminate\Database\Seeder;

class ExpertTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create('zh_CN');

        $project = \App\Models\Project::all()->pluck('id');

        $names = [
            "劉承穎",
            "黃羽琦",
            "林郁婷",
            "詹夢慈",
            "陳心怡",
            "胡世昌",
            "王俊宏",
            "黃冠伶",
            "劉秀芬",
            "潘意茂",
            "張萱琴",
            "楊奎瑩",
            "戴蓉安",
            "羅懿玫",
            "賁雅琪",
            "丁雅琳",
            "林威廷",
            "李威廷",
            "郭家一",
            "邱雅惠",
            "張淑伸",
            "涂燕臻",
            "陳詩泉",
            "劉政峰",
            "林佳季",
            "楊怡文",
            "黃佳信",
            "馮延修",
            "劉漢淑",
            "吳旺琬",
            "黃柏龍",
            "吳佩穎",
            "彭于倫",
            "蘇明峰",
            "陳孟妤",
            "蔡婉瑜",
            "鬱東蘋",
            "朱建智",
            "涂雅娟",
            "王詩伯",
            "蘇雅雯",
            "溫惠文",
            "蔡怡君",
            "林建念",
            "林國能",
            "廖緯秀",
            "馮蓉仰",
            "王冠梅",
            "李宜福",
            "趙筠陽",
        ];
        factory(\App\Models\Expert::class, 20)->make()->each(function ($item, $index) use ($project, $faker, $names) {
            $item->name = $names[$index];
            $expert     = \App\Models\Expert::create($item->toArray());
            $expert->project()->sync($faker->randomElements($project, 4));
        });
    }
}
