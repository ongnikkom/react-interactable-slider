# Testing Custom Hooks

## Do all custom hooks require testing 🤔⚓️

No. All hooks don't require testing. In fact you _almost_ can get away without testing the custom hooks that are being used only in one component, that is to say if you want to test it, you can. More tests will not harm your code.

Why Almost? Well, if the custom hook has external dependencies, then tests are strongly advised.

You might find certain custom hooks being used in multiple components. Those are the one that you need to test for sure.

## How can it be tested 🧪❓