require.config({
    baseUrl: 'js',
    paths: {
        Underscore: 'https://cdn.jsdelivr.net/underscorejs/1.6.0/underscore-min',
        Snap: 'https://cdn.jsdelivr.net/snap.svg/0.3.0/snap.svg'
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