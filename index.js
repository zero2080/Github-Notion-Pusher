import { getInput, error } from '@actions/core';
import * as github from '@actions/github';
import { run } from './src/notion';

async function start(){
    const notion_token = getInput('NOTION_TOKEN');
    const notion_database = getInput('NOTION_DATABASE');
    const position = getInput('POSITION');
    const target_branch = getInput('TARGET_BRANCH');
    const committer_id = getInput('NOTION_PEOPLE_ID');

    try{
        await run({
            "NOTION_TOKEN":notion_token,
            "NOTION_DATABASE":notion_database,
            "POSITION":position,
            "TARGET_BRANCH":target_branch,
            "NOTION_PEOPLE_ID":committer_id,
            "GITHUB":github
        });
    }catch(e){
        error(e);
    }
}

(async ()=> {
    await start();
})();