<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('<?php echo get_template_directory_uri() . '/build/service-worker.js'; ?>', {scope: '/'})
                .then(registration => {
                    console.log('SW registered: ', registration)
                }).catch(registrationError => {
                    console.log('SW registration failed: ', registrationError)
                })
        })
    }
</script>
