require.config({
    baseUrl: 'js',
    paths: {
        Underscore: 'vendor/underscore/underscore',
        Snap: 'vendor/snap.svg/dist/snap.svg'
    },
    shim: {
        Underscore: {
            exports: '_'
        },
        Snap: {
            exports: 'Snap'
        }
    }

});

require(['flake']);