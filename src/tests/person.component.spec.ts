import { PersonComponent } from '@/app/people/person.component';
import { PersonService } from '@/app/people/person.service';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let service: PersonService;

  beforeEach(() => {
    service = new PersonService();
    component = new PersonComponent();
    // Manually inject the service since we bypass Angular DI
    (component as any).personService = service;
  });

  test('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  test('should expose personService signal items', () => {
    const items = component.personService.items();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    // Basic sanity check for first item structure
    const first = items[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('nationality');
    expect(first).toHaveProperty('notableAchievements');
    expect(Array.isArray(first.notableAchievements)).toBe(true);
  });

  test('personService.getPerson returns expected person', () => {
    const grace = component.personService.getPerson(2);
    expect(grace).toBeDefined();
    expect(grace.name).toBe('Grace Hopper');
  });
});
