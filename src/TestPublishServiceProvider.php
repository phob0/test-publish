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

        $this->publishes([__DIR__.'/../frontend' => base_path()], 'frontend');
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/translatable.php', 'translatable');

	$this->commands([
            Console\ModuleMake::class,
            Console\ControllerMake::class,
            Console\RepositoryMake::class,
            Console\ModelMake::class,
            Console\ResourceMake::class
        ]);
    }
}
