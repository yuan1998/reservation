<?php

use Illuminate\Database\Seeder;

class ProjectTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = [
            "门诊",
            "急诊",
            "候诊",
            "就诊设施",
            "病历档案袋",
            "诊断书",
            "收费",
            "清单",
            "初诊建病历",
            "病历手册",
            "营养状况评估",
            "童营养评估儿",
            "营养咨询",
            "机械辅助排痰",
            "动静脉置管护理",
            "吸痰护理",
            "气管切开护理",
            "大抢救",
            "小抢救",
            "中抢救",
            "氧气吸入",
            "加压给氧",
            "肌肉注射",
            "静脉注射",
            "大清创缝合",
            "抗肿瘤化学药物配置",
            "动脉穿刺置管术",
            "肠内高营养治疗",
            "洗胃机洗胃",
            "冷热湿敷",
            "引流管冲洗",
            "持续膀胱冲洗",
        ];

        factory(\App\Models\Project::class, count($projects))->make()->each(function ($item, $index) use ($projects) {
            $item->name = $projects[$index];
            \App\Models\Project::create($item->toArray());
        });
    }
}
