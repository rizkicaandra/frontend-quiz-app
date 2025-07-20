<script lang="ts">
	import Subject from './Subject.svelte';

</script>

<div
	class="text-preset-4-mobile flex flex-col gap-4 px-6 pt-8 text-blue-900 md:gap-16 md:px-16 md:pt-0 md:pb-55 lg:flex-row lg:justify-center lg:gap-32 dark:text-white"
>
	<!-- Header -->
	<div class="lg:pr-3.3 flex flex-col gap-4 lg:gap-12">
		<div class="flex flex-col gap-2">
			<h1 class="text-preset-2-mobile-light md:text-preset-2-light">Welcome to the</h1>
			<h1 class="text-preset-2-mobile-medium md:text-preset-2-medium">Frontend Quiz!</h1>
		</div>

		<h2 class="text-preset-5-mobile text-grey-500 md:text-preset-6 italic dark:text-blue-300">
			Pick a subject to get started.
		</h2>
	</div>

	<!-- Subjects  -->
	<Subject />
</div>
