<script>
	import Header from '$lib/Header.svelte';
	import StartMenu from '$lib/StartMenu.svelte';
</script>

<main
	class="font-family-regular w-full bg-[url('/images/pattern-background-mobile-light.svg')] bg-cover bg-center transition-colors duration-600 ease-in-out md:bg-[url('/images/pattern-background-tablet-light.svg')] md:bg-auto md:bg-top-left md:bg-no-repeat lg:bg-[url('/images/pattern-background-desktop-light.svg')] lg:bg-cover lg:bg-center dark:bg-[url('/images/pattern-background-mobile-dark.svg')] md:dark:bg-[url('/images/pattern-background-tablet-dark.svg')] lg:dark:bg-[url('/images/pattern-background-desktop-dark.svg')]"
>
	<Header />
	<StartMenu />
</main>
