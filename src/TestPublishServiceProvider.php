<?php

namespace Phobo\TestPublish;

use Illuminate\Support\ServiceProvider;

class TestPublishServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../config/translatable.php' => config_path('translatable.php'),
        ], 'config');
    }

    public function register()
    {
        if (class_exists('Phobo\TestPublish\TestPublishServiceProvider')) {
            $this->app->register('Phobo\TestPublish\TestPublishServiceProvider');
        }

        $this->mergeConfigFrom(__DIR__.'/../config/translatable.php', 'translatable');
    }
}
