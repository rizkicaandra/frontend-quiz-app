<script lang="ts">
	import { onMount } from 'svelte';
	import type { SubjectInterface } from './interface';
	import { getTenNumbersFrom1To20, setLocalStorage } from './utils';

	let subjects: SubjectInterface[] = $state([]);

	onMount(async () => {
		subjects = await fetch('/data/subjects.json').then((res) => res.json());
	});

	function handleSubject(subject: SubjectInterface) {
		const questionNumber = getTenNumbersFrom1To20();

		setLocalStorage('subject', subject, 2);
		setLocalStorage('questionNumber', questionNumber, 2);
		setLocalStorage('score', [], 2);
	}
</script>

<div class="flex flex-col gap-4 md:gap-6 lg:w-full lg:max-w-141 lg:gap-4">
	{#each subjects as subject}
		<a
			href="/quiz/{subject.quiz}"
			class="gap-3.3 dark:bg-blue-850 lg:p-5.2 dark:border-blue-850 flex flex-row items-center rounded-xl border-(length:--border-3) border-white bg-white p-4 hover:border-(length:--border-3) hover:border-purple-600 hover:opacity-80 active:border-(length:--border-3) active:border-purple-600 active:opacity-80 md:gap-8 md:rounded-3xl lg:gap-8"
			onclick={() => handleSubject(subject)}
		>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-md md:h-14 md:w-14 lg:h-14 lg:w-14 bg-{subject.color} "
			>
				<img class="h-8 w-8 md:h-10 md:w-10" src={subject.logo} alt="{subject.name}-logo" />
			</div>
			<h2 class="text-preset-4-mobile md:text-preset-4">{subject.name}</h2>
		</a>
	{/each}
</div>
