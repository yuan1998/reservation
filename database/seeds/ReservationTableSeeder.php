<?php

use Illuminate\Database\Seeder;

class ReservationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker         = \Faker\Factory::create('zh-CN');
        $expertProject = \App\Models\ExpertProject::all();
        $timelines     = \App\Models\Timeline::all()->pluck('id')->all();
        $expertRest    = \App\Models\ExpertRest::all();

        $names = [
            "楊淑貞",
            "張柏成",
            "許惠芷",
            "王榮韻",
            "蔡欣雨",
            "王啟銘",
            "林志嘉",
            "林力尹",
            "陳念妹",
            "張清木",
            "楊雅白",
            "黃向紹",
            "韓勝瑄",
            "許淑敏",
            "陳珮瑜",
            "陳淑娟",
            "陳韻桂",
            "茅鴻玫",
            "黃美光",
            "涂勇珍",
            "林中福",
            "柳正麟",
            "陳妍典",
            "黃靖南",
            "楊政勳",
            "彭東云",
            "張竣薇",
            "陳士弘",
            "袁美俊",
            "吳家卿",
            "袁依萍",
            "陳志吟",
            "楊承穎",
            "林宗樂",
            "李淑昀",
            "白欣樺",
            "陳俊凱",
            "廖家俐",
            "陳婉婷",
            "白俊吉",
            "楊惠天",
            "陳法均",
            "林曉虹",
            "楊怡潔",
            "劉易雅",
            "黃丹鈺",
            "廖婉坤",
            "何雅韻",
            "李子傑",
            "謝俊吉",
            "戴怡璇",
            "黃怡君",
            "陳弘雅",
            "楊文凱",
            "陳信麟",
            "林國郁",
            "李盈秀",
            "傅書瑋",
            "江宜臻",
            "陳慶康",
            "陳行旺",
            "陳安珊",
            "陳明秀",
            "江裕梅",
            "錢文豪",
            "連培倫",
            "陳歡谷",
            "夏千妹",
            "許建緯",
            "游淑珍",
            "鄭文亞",
            "陳群娥",
            "許欣瑜",
            "李嘉文",
            "費珮彥",
            "李君宸",
            "楊涵竹",
            "時冰孜",
            "翁思婷",
            "賴恭忠",
            "錢彥廷",
            "江群儒",
            "張柏勳",
            "蔡昶夫",
            "傅政翰",
            "劉惠玲",
            "黃雅齊",
            "吳怡婷",
            "陳筱玟",
            "林秋青",
            "鄭子純",
            "劉柏宇",
            "金舒婷",
            "陳孟璇",
            "何雅萍",
            "劉承翰",
            "胡惠雯",
            "謝聖傑",
            "陳惠哲",
            "吳念輝",
        ];

        factory(\App\Models\Reservation::class, 100)->make()->each(function ($item, $index)
        use ($faker, $expertRest, $expertProject, $timelines, $names) {
            $projectItem = $expertProject->random(1)->toArray()[0];

            $data = \App\Models\Timeline::with([
                'rest' => function ($query) use ($item, $projectItem) {

                    $query->whereDate('date', $item->date);

                    $query->where('expert_id', $projectItem['expert_id']);
                }
            ])->get();

            $data = $data->first(function ($item, $value) use ($projectItem) {
                return count($item->rest) < 1;
            });

            $item->fill([
                'expert_id'   => $projectItem['expert_id'],
                'project_id'  => $projectItem['project_id'],
                'timeline_id' => $data['id'],
                'name'        => $names[$index]
            ]);

            \App\Models\Reservation::create($item->toArray());
        });
    }
}
