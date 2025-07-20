<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SubjectInterface } from '$lib/interface';
	import { getLocalStorage } from '$lib/utils';
	import { onMount } from 'svelte';

	let subject: SubjectInterface | null = $state(null);
	let score: number = $state(0);

	onMount(async () => {
		subject = getLocalStorage('subject');
		let scores = getLocalStorage<number[]>('score');
		if (scores) {
            if(scores.length !== 10) {
                goto(`/quiz/${subject?.quiz}`);
            }

			score = scores.reduce((a, b) => a + b, 0);
		}
	});

    function handlePlayAgain() {
        localStorage.removeItem('score');
        localStorage.removeItem('questionNumber');
        localStorage.removeItem('subject');
        goto('/');
    }
</script>

<div
	class="flex flex-col gap-10 px-6 pt-8 text-blue-900 md:mb-40 md:gap-0 md:px-16 lg:flex-row dark:text-white lg:gap-36 lg:items-start lg:justify-center lg:p-0"
>
	<div class="md:mb-16">
		<h1 class="text-preset-2-mobile-light md:text-preset-2-light mb-2">Quiz Completed</h1>
		<h1 class="text-preset-2-mobile-medium md:text-preset-2-medium">You Scored...</h1>
	</div>
	<div class="lg:max-w-141 lg:w-full">
		<div
			class="dark:bg-blue-850 flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 md:mb-8 md:p-12 lg:p-12"
		>
			<div class="flex items-center justify-center gap-4 md:gap-6 md:pb-6">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-md md:h-14 md:w-14 lg:h-14 lg:w-14 bg-{subject?.color} "
				>
					<img class="h-8 w-8 md:h-10 md:w-10" src={subject?.logo} alt="{subject?.name}-logo" />
				</div>
				<h2 class="text-preset-4-mobile md:text-preset-4 text-blue-900 dark:text-white">
					{subject?.name}
				</h2>
			</div>
			<h1 class="text-preset-1-mobile md:text-preset-1">{score}</h1>
			<h2 class="text-grey-500 text-preset-4-mobile md:text-preset-5-medium dark:text-blue-300">
				out of 10
			</h2>
		</div>
		<button
			onclick={handlePlayAgain}
			type="button"
			aria-label="play-again"
			class="cursor-pointer md:text-preset-4 w-full mt-4 text-preset-4-mobile rounded-xl bg-purple-600 p-4 border-4 border-purple-600 text-white md:p-7 hover:opacity-80"
		>
			Play Again
		</button>
	</div>
</div>
