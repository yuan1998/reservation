<?php

function test () {
    dd(1);
}

/**
 * @param \Spatie\Permission\Models\Permission::query $query
 * @param array $arr
 * @return mixed
 */
function arrInPermission ($query , $arr) {
    return $query->whereIn('name' , $arr)->get();
}
