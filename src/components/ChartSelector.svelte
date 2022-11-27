<script>
    export let options = [];
    export let selected;

    function renameOption(option) {
        if (option === 'a'){
                return 'All Prehistoric Creatures'
            }
           else if (option === 'b'){
                return '0-10 ft'
            }
           else if (option === 'c'){
                return '11-25 ft'
            }
           else if (option === 'd'){
                return '26-40 ft'
            }
           else if (option === 'e'){
                return '40+ ft'
            }
            else {
                return option
            }
    }
    
</script>

<div class="selector">
    {#each options as option}
        <span>
            <input
                type="radio"
                id={option}
                on:change={() => (selected = option)}
                checked={selected === option}
            /><br />
            <label for={option}>{renameOption(option)}</label>
        </span>
    {/each}
</div>

<style>
    .selector {
        display: flex;
        justify-content: center;
        gap: 35px;
        width: 100%;
        height: 100px;
        font-size: 1rem;
        font-family: var(--font-02);
        text-align: center;
    }
        
    
</style>
