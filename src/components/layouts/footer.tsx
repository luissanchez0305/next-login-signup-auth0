import React from 'react';
import { LayoutFooter } from '@paljs/ui/Layout';
import { Actions, ActionType } from '@paljs/ui/Actions';
import { Config } from '../../core';

const getActions = (): ActionType[] => {
  const actions: ActionType[] = Config.getInstance()
    .appURLs.filter((appUrl) => appUrl.url != undefined)
    .map((appUrl) => {
      return {
        content: (
          <a href={appUrl.url} target="_blank" rel="noreferrer">
            <img height="20" src={`/icons/${appUrl.iconName}`} alt={appUrl.name} />
          </a>
        ),
      };
    });

  return actions;
};

const Footer: React.FC = (): JSX.Element => {
  return (
    <LayoutFooter>
      <Actions size="Small" className="center" actions={getActions()} />
    </LayoutFooter>
  );
};

export default Footer;
