import actionType from './header.actionType';
import {action} from 'typesafe-actions';

export const StartChangeHeaderTitle = (title='')=>action(
    actionType.CHANGE_HEADER_TITLE,
    {title},
);

export const ChangeHeaderTitleSuccessful = (title)=>action(
    actionType.CHANGE_HEADER_TITLE_SUCCESSFUL,
    {title},
);

export const ChangeHeaderTitleFail = (error)=>action(
    actionType.CHANGE_HEADER_TITLE_SUCCESSFUL,
    {error},
);