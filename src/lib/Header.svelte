<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import type { SubjectInterface } from './interface/subject';
	import { getLocalStorage, setLocalStorage } from './utils';
	import { goto } from '$app/navigation';

	let isDark = $state(false);
	let quizTopic = $state(page.params.slug);
	let subject: SubjectInterface | null = $state(null);

	onMount(() => {
		const theme = getLocalStorage<string>('theme');
		subject = getLocalStorage('subject');

		if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
			isDark = true;
		}

		if (page.url.pathname === '/quiz/result' && subject) {
			quizTopic = subject?.quiz;
		} else if (quizTopic !== subject?.quiz || !subject) {
			goto('/');
		}
	});

	function toggleTheme() {
		if (isDark) {
			document.documentElement.classList.remove('dark');
			setLocalStorage('theme', 'light', 0);
			isDark = false;
		} else {
			document.documentElement.classList.add('dark');
			setLocalStorage('theme', 'dark', 0);
			isDark = true;
		}
	}
</script>

<div
	class="flex items-center {quizTopic
		? 'justify-between'
		: 'justify-end'} lg:max-w-container-home-desktop px-6 py-4 md:px-16 md:py-11 lg:m-auto lg:px-0 lg:py-21.25"
>
	<div class="flex flex-row items-center justify-center gap-4">
		{#if quizTopic}
			<div
				class="flex h-10 w-10 items-center justify-center rounded-md md:h-14 md:w-14 lg:h-14 lg:w-14 bg-{subject?.color} "
			>
				<img class="h-8 w-8 md:h-10 md:w-10" src={subject?.logo} alt="{subject?.name}-logo" />
			</div>
			<h2 class="text-preset-4-mobile md:text-preset-4 text-blue-900 dark:text-white">
				{subject?.name}
			</h2>
		{/if}
	</div>
	<div class="flex h-10 flex-row items-center gap-2 md:gap-4 lg:h-14">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
			><path
				fill="#626C7F"
				class="dark:fill-white"
				d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 12 1.5Zm0 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.75-2.25a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5ZM12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-8.25-6.75a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5Zm.969-8.031a.75.75 0 0 1 1.062 0l1.5 1.5a.751.751 0 0 1-1.062 1.062l-1.5-1.5a.75.75 0 0 1 0-1.062Zm1.062 14.562a.75.75 0 1 1-1.062-1.06l1.5-1.5a.75.75 0 1 1 1.062 1.06l-1.5 1.5Zm13.5-14.562a.75.75 0 0 0-1.062 0l-1.5 1.5a.751.751 0 0 0 1.062 1.062l1.5-1.5a.75.75 0 0 0 0-1.062Zm-1.062 14.562a.75.75 0 0 0 1.062-1.06l-1.5-1.5a.75.75 0 0 0-1.062 1.06l1.5 1.5Z"
			/></svg
		>
		<button
			type="button"
			aria-label="Toggle dark mode"
			class="relative h-5 w-8 cursor-pointer rounded-4xl bg-purple-600 p-1 hover:opacity-80 md:h-7 md:w-12"
			onclick={toggleTheme}
		>
			<div
				class="h-3 w-3 transform rounded-full bg-white transition-transform duration-500 md:h-5 md:w-5 {isDark
					? 'translate-x-3 md:translate-x-5'
					: 'translate-x-0'}"
			></div>
		</button>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
			><path
				fill="#626C7F"
				class="dark:fill-white"
				d="M11.775 4.522A7.5 7.5 0 1 1 4.898 16.09c2.104-.57 4.974-1.953 6.24-5.326.828-2.211.876-4.408.637-6.241ZM20.184 12a8.997 8.997 0 0 0-9.315-8.994.75.75 0 0 0-.713.888c.345 1.821.42 4.092-.424 6.342-1.2 3.201-4.203 4.26-6.115 4.606a.75.75 0 0 0-.542 1.066A9 9 0 0 0 20.184 12Z"
			/></svg
		>
	</div>
</div>
