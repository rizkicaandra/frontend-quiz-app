<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex flex-col mt-36 items-center justify-center gap-8">
	<p class="text-preset-2-mobile-medium md:text-preset-2-medium text-blue-900 dark:text-white italic text-center">
		{page.status} - {page.error?.message}
    </p>
	<a href="/" class="text-preset-3-mobile text-white md:text-preset-3 p-4 bg-grey-500 rounded-md">Back to Home</a>
</div>
