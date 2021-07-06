import { Pipe, PipeTransform } from '@angular/core';

import { GInbox } from '../models/group.model';

@Pipe({ name: 'groupFilter' })
export class GroupFilterPipe implements PipeTransform {
  transform(items: GInbox[], searchText: string): GInbox[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    return items.filter((inbox) => {
      const groupName = inbox.sender.groupname?.toLowerCase();
      const name = `${groupName}`;
      const lowerSearchText = searchText.toLowerCase();

      if (name.includes(lowerSearchText)) {
        return true;
      }

      return false;
    });
  }
}
