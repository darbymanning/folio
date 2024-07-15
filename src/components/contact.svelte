<script lang="ts">
  import { applyAction, enhance } from "$app/forms"
  import { page } from "$app/stores"
  import { label_id } from "$lib/utils"
  import { slide } from "svelte/transition"

  let submitting = $state(false)
</script>

{#snippet input({ label, type = "text" })}
  {@const id = label_id(label)}
  {@const value = $page.form?.[id] || ""}

  <label for={id} class="relative">
    {label}
  </label>

  {#if type === "textarea"}
    <textarea rows="5" {id} name={id} {value}></textarea>
  {:else}
    <input {type} {id} name={id} required {value} />
  {/if}
{/snippet}

<section class="p-10 grid gap-2 print:hidden" id="contact">
  <h1 class="heading-1" data-scroll data-scroll-speed="0.12">Contact</h1>
  {#if $page.form?.sent}
    <p
      transition:slide
      data-scroll
      data-scroll-speed="0.12"
      data-testid={$page.form.honey ? "honeypot" : undefined}
    >
      Thank you for your message.
    </p>
  {:else}
    <div transition:slide>
      <p data-scroll data-scroll-speed="0.12">
        Interested in working together? Let’s start the conversation...
      </p>
      <form
        data-scroll
        data-scroll-speed="0.2"
        data-scroll-css-progress
        data-scroll-position="start,start"
        action="/contact"
        method="POST"
        class="grid gap-2 w-full mt-20 mb-[30vh] opacity-[calc(1.4_*_var(--progress))]"
        use:enhance={() => {
          submitting = true

          return async ({ result }) => {
            submitting = false

            await applyAction(result)
          }
        }}
      >
        {#if $page.status === 400}
          <div class="text-red-500" transition:slide>
            {#if $page.form?.missing}
              <p>Please fill in all fields.</p>
            {:else}
              <p>There was an error with your submission.</p>
            {/if}
          </div>
        {/if}
        <label for="first_name" class="🍯">First name</label>
        <input
          class="🍯"
          id="first_name"
          name="first_name"
          autocomplete="off"
          placeholder="First name"
        />
        {@render input({ label: "Name" })}
        {@render input({ label: "Email", type: "email" })}
        {@render input({ label: "Message", type: "textarea" })}
        <button
          disabled={submitting}
          class="bg-white text-black justify-self-start font-mono hover:brightness-90 cursor-pointer p-4 px-10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send message
        </button>
      </form>
    </div>
  {/if}
</section>

<style>
  .🍯 {
    opacity: 0;
    position: absolute;
    inset: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  textarea,
  input {
    padding: var(--spacing-3);
    background: color-mix(in srgb, var(--color-gray-400) 15%, transparent);
    color: var(--color-white);
    border: none;
    margin-bottom: var(--spacing-4);
  }
</style>
