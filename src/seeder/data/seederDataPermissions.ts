export const seederDataPermissions: { name: string, group?: string } [] = [
  // User Permissions
  { name: 'user.create', group: 'user' },
  { name: 'user.read', group: 'user' },
  { name: 'user.edit', group: 'user' },
  { name: 'user.delete', group: 'user' },
  // Skill Permissions
  { name: 'skill.create', group: 'skill' },
  { name: 'skill.read', group: 'skill' },
  { name: 'skill.edit', group: 'skill' },
  { name: 'skill.delete', group: 'skill' },
  // Messages Permissions
  { name: 'message.create', group: 'message' },
  { name: 'message.read', group: 'message' },
  { name: 'message.edit', group: 'message' },
  { name: 'message.delete', group: 'message' },
  // Projects Permissions
  { name: 'project.create', group: 'project' },
  { name: 'project.read', group: 'project' },
  { name: 'project.edit', group: 'project' },
  { name: 'project.delete', group: 'project' },
];
