<?php

class WHQAssets
{
    private $assets = [];

    public function __construct($manifestFile)
    {
        $this->assets = [];

        if (file_exists($manifestFile)) {
            $manifest = file_get_contents($manifestFile);
            $this->assets = json_decode($manifest, true);
        }
    }

    public function get($path, $filename)
    {
        try {
            return $path . '/' . $this->assets[$filename];
        } catch (\Exception $e) {
            return '';
        }
    }
}
