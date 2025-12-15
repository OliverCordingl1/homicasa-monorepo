import { BaseService } from "./base-service";
import {
  BusinessMemberRepository,
  type BusinessMember,
  type NewBusinessMember,
} from "@homicasa/db/repositories/business-member-repository";
import { db } from "@homicasa/db";
import type { BusinessMembershipSwitchButtonSchemaType } from "@homicasa/schemas";

export class BusinessMemberService extends BaseService {
  private repo: BusinessMemberRepository;

  constructor(ctx: any) {
    super(ctx);
    this.repo = new BusinessMemberRepository(db);
  }

  async getUserMemberships(
    userId?: string
  ): Promise<BusinessMembershipSwitchButtonSchemaType[]> {
    const id = userId || this.getCurrentUserId();

    const rawMemberships = await this.repo.findByUserIdWithJoins(id, {
      includeBusiness: true,
    });

    return rawMemberships.map((entry) => ({
      membershipId: entry.member.id,
      businessId: entry.member.businessId,
      businessName:
        entry.business?.displayName || entry.business?.legalName || "Unknown",
    }));
  }

  // async getById(id: string): Promise<BusinessMember | undefined> {
  //   return this.repo.findById(id);
  // }

  // async getByBusinessId(businessId: string): Promise<BusinessMember[]> {
  //   return this.repo.findByBusinessId(businessId);
  // }

  // async getByUserId(userId: string): Promise<BusinessMember[]> {
  //   return this.repo.findByUserId(userId);
  // }

  // async listAll(): Promise<BusinessMember[]> {
  //   return this.repo.findAll();
  // }

  async addMember(
    data: NewBusinessMember,
    options: {
      skipPermissionCheck?: boolean;
    } = { skipPermissionCheck: false }
  ): Promise<BusinessMember> {
    if (!options.skipPermissionCheck) {
      this.getCurrentUserId();
    }
    return this.repo.create(data);
  }

  // async updateMember(
  //   id: string,
  //   data: Partial<NewBusinessMember>,
  //   options: {
  //     skipPermissionCheck?: boolean;
  //   } = { skipPermissionCheck: false }
  // ): Promise<BusinessMember> {
  //   if (!options.skipPermissionCheck) {
  //     this.getCurrentUserId();
  //   }
  //   const updated = await this.repo.update(id, data);
  //   if (!updated) {
  //     throw new Error(`Business member with id ${id} not found`);
  //   }
  //   return updated;
  // }

  // async removeMember(
  //   id: string,
  //   options: {
  //     skipPermissionCheck?: boolean;
  //   } = { skipPermissionCheck: false }
  // ): Promise<BusinessMember> {
  //   if (!options.skipPermissionCheck) {
  //     this.getCurrentUserId();
  //   }
  //   const deleted = await this.repo.delete(id);
  //   if (!deleted) {
  //     throw new Error(`Business member with id ${id} not found`);
  //   }
  //   return deleted;
  // }
}
