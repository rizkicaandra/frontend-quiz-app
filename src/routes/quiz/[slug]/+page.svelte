<script lang="ts">
	import { onMount } from 'svelte';
	import { getLocalStorage, numberToLetters, setLocalStorage } from '$lib/utils';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { ExamContentInterface } from '$lib/interface';

	let exams: ExamContentInterface[] = $state([]);
	let examContent: ExamContentInterface = $state({
		question: '',
		options: [],
		answer: '',
		borderColor: [],
		bgColor: []
	});
	let questionNumber: number[] | null = $state([]);
	let totalQuestion: number = $state(0);
	let score: number[] = $state([]);
	let selectedAnswer: string = $state('');
	let isCorrect: boolean = $state(false);
	let isNextQuestion: boolean = $state(false);
	let displayIncorrectAnswer: number = $state(5);
	let displayCorrectAnswer: number = $state(5);

	onMount(async () => {
		exams = await fetch(`/data/${page.params.slug}.json`).then((res) => res.json());
		let scores = getLocalStorage<number[]>('score');
		if (scores) {
			score = scores;
			totalQuestion = scores.length + 1;
		}

		questionNumber = getLocalStorage<number[]>('questionNumber');
		if (questionNumber) {
			examContent = exams[questionNumber[totalQuestion - 1] - 1];
			examContent.borderColor = [];
			examContent.bgColor = [];
		}
	});

	function handleAnswer(answer: string) {
		selectedAnswer = answer;
		examContent.borderColor = [];
		examContent.borderColor = examContent.options.map((option) =>
			option === selectedAnswer ? 'border-purple-600' : 'border-white dark:border-blue-850'
		);
	}

	function submitAnswer() {
		isCorrect = selectedAnswer === examContent.answer;
		score.push(+isCorrect);
		setLocalStorage('score', score, 2);

		examContent.borderColor = [];
		examContent.bgColor = [];

		examContent.borderColor = examContent.options.map((option, idx) => {
			if (option === selectedAnswer) {
				if (isCorrect) {
					displayCorrectAnswer = idx;
					return 'border-green-500';
				} else {
					displayIncorrectAnswer = idx;
					return 'border-red-500';
				}
			}
			if (option === examContent.answer) {
				displayCorrectAnswer = idx;
			}
			return 'border-white dark:border-blue-850';
		});

		examContent.bgColor = examContent.options.map((option, idx) => {
			if (option === selectedAnswer) {
				if (isCorrect) {
					return 'bg-green-500 text-white';
				} else {
					return 'bg-red-500 text-white';
				}
			}

			return 'bg-grey-50';
		});

		isNextQuestion = true;
	}

	function nextPage() {
		if (totalQuestion === 10) {
			goto('/quiz/result');
		}

		totalQuestion += 1;
		selectedAnswer = '';
		isCorrect = false;
		isNextQuestion = false;
		displayIncorrectAnswer = 5;
		displayCorrectAnswer = 5;

		if (questionNumber) {
			examContent = exams[questionNumber[totalQuestion - 1] - 1];
			examContent.borderColor = [];
			examContent.bgColor = [];
		}

	}

	$inspect(totalQuestion, 'totalQuestion');
</script>

<div
	class="text-grey-500 flex flex-col gap-10 px-6 pt-8 md:gap-10 md:px-16 md:pt-0 lg:flex-row lg:justify-center lg:gap-32"
>
	<!-- Header -->
	<div class="lg:max-w-container-title-quiz-destop">
		<h3 class="text-preset-5-mobile md:text-preset-6 mb-4 italic md:mb-6 dark:text-blue-300">
			Question {totalQuestion} of 10
		</h3>
		<h1
			class="text-preset-3-mobile md:text-preset-3 mb-6 text-blue-900 md:mb-10 lg:mb-46 lg:h-full lg:max-h-51 dark:text-white"
		>
			{examContent?.question}
		</h1>
		<div class="dark:bg-blue-850 flex h-4 w-full items-center rounded-lg bg-white">
			<div
				class="mr-1.5 ml-1.5 h-2  rounded-lg bg-purple-600 transition-all duration-300 ease-in-out"
				style="width:{totalQuestion * 10}%"
			></div>
		</div>
	</div>

	<!-- Content -->
	<div class="relative flex flex-col gap-4 md:gap-6 lg:w-full lg:max-w-141 lg:gap-4">
		{#each examContent?.options as option, index}
			<button
				disabled={displayCorrectAnswer !== 5}
				type="button"
				aria-label={option}
				onclick={() => handleAnswer(option)}
				class="group dark:bg-blue-850 lg:p-5.2 flex cursor-pointer flex-row items-center gap-4 rounded-xl border-(length:--border-3) {examContent
					?.borderColor?.[index] ??
					'dark:border-blue-850 border-white'} bg-white p-4 hover:border-(length:--border-3) hover:border-purple-600 hover:text-white hover:opacity-80 md:gap-8"
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md uppercase group-hover:bg-purple-600 {examContent
						?.borderColor?.[index] == 'border-purple-600'
						? 'bg-purple-600 text-white'
						: (examContent?.bgColor?.[index] ?? 'bg-grey-50')} md:h-14 md:w-14 md:rounded-xl"
				>
					<span class=" text-preset-4-mobile md:text-preset-4">
						{numberToLetters(index + 1)}
					</span>
				</div>
				<span
					class="text-preset-5-mobile md:text-preset-4-mobile text-start text-blue-900 dark:text-white"
				>
					{option}
				</span>

				{#if index === displayCorrectAnswer}
					<img src="/images/icon-correct.svg" alt="correct" class="absolute right-5 h-10 w-10" />
				{:else if index === displayIncorrectAnswer}
					<img src="/images/icon-incorrect.svg" alt="wrong" class="absolute right-5 h-10 w-10" />
				{/if}
			</button>
		{/each}
		<button
			type="button"
			disabled={!selectedAnswer}
			onclick={isNextQuestion ? nextPage : submitAnswer}
			aria-label="Submit Answer"
			class="md:text-preset-4 cursor-pointer rounded-xl border-2 border-purple-600 bg-purple-600 p-3.5 text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 md:mt-2 md:mb-13 md:rounded-3xl md:p-7.5"
			>{isNextQuestion ? 'Next Question' : 'Submit Answer'}</button
		>
	</div>
</div>
