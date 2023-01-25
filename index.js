import { getInput, error } from '@actions/core';
import * as github from '@actions/github';
import { run } from './src/notion';

async function start(){
    const notion_token = getInput('NOTION_TOKEN');
    const notion_database = getInput('NOTION_DATABASE');
    const position = getInput('POSITION');
    const target_branch = getInput('TARGET_BRANCH');

    try{
        await run({
            "NOTION_TOKEN":notion_token,
            "NOTION_DATABASE":notion_database,
            "POSITION":position,
            "TARGET_BRANCH":target_branch,
            "GITHUB":github
        });
    }catch(e){
        error(e);
    }
}

(async ()=> {
    await start();
})();