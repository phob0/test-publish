<?php

namespace Phobo\TestPublish;

use Illuminate\Support\ServiceProvider;

class TestPublishServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../config/test.php' => config_path('test.php'),
        ], 'config');
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/test.php', 'test');
    }
}